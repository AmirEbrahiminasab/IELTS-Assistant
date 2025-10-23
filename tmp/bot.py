import os
import logging
import asyncio
import uuid
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove, Bot
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)
from telegram.constants import ChatAction

# --- Import your refactored agent runners ---
from part1.main import run_ielts_part1_agent
from part2.main import run_ielts_part2_agent

# --- Configuration ---
from dotenv import load_dotenv
load_dotenv()
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
if not TELEGRAM_TOKEN:
    raise SystemExit("TELEGRAM_TOKEN not set in .env")

# --- Logging Setup ---
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# --- Conversation States ---
CHOOSE_PART, GET_P1_IMAGE, GET_P1_ESSAY, GET_P2_QUESTION, GET_P2_ESSAY = range(5)


# --- Command Handlers ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Starts the conversation and asks the user to choose an IELTS part."""
    logger.info(f"Received /start from user {update.effective_user.id}")
    reply_keyboard = [["IELTS Writing Part 1", "IELTS Writing Part 2"]]
    await update.message.reply_text(
        "Hi! I am your AI-powered IELTS Writing Assistant.\n\n"
        "Please choose which task you'd like me to analyze.",
        reply_markup=ReplyKeyboardMarkup(
            reply_keyboard, one_time_keyboard=True, resize_keyboard=True
        ),
    )
    return CHOOSE_PART


async def choose_part(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_choice = update.message.text
    if "Part 1" in user_choice:
        context.user_data['part'] = 1
        await update.message.reply_text(
            "Great! For Part 1, please send me the image, chart, or graph for the task.",
            reply_markup=ReplyKeyboardRemove()
        )
        return GET_P1_IMAGE
    elif "Part 2" in user_choice:
        context.user_data['part'] = 2
        await update.message.reply_text(
            "Excellent! For Part 2, please send me the essay question.",
            reply_markup=ReplyKeyboardRemove()
        )
        return GET_P2_QUESTION
    else:
        await update.message.reply_text("Invalid choice. Please type /start to begin again.")
        return ConversationHandler.END


# --- Part 1 Flow ---
async def get_p1_image(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    photo_file = await update.message.photo[-1].get_file()
    image_filename = f"temp_{uuid.uuid4()}.jpg"
    await photo_file.download_to_drive(image_filename)
    context.user_data['image_path'] = image_filename
    await update.message.reply_text("Thank you! Now, please send me your full essay response for this image.")
    return GET_P1_ESSAY


async def handle_p1_essay(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    student_essay = update.message.text
    image_path = context.user_data.get('image_path')

    if not image_path or not os.path.exists(image_path):
        await update.message.reply_text("Something went wrong with the image. Please type /start to begin again.")
        return ConversationHandler.END

    await update.message.reply_text("Analyzing your Part 1 response. This may take a moment...")
    await context.bot.send_chat_action(chat_id=update.effective_chat.id, action=ChatAction.TYPING)

    try:
        result = await asyncio.to_thread(run_ielts_part1_agent, image_path, student_essay)
        await update.message.reply_text(result)
    except Exception as e:
        logger.error(f"Error in Part 1 agent: {e}", exc_info=True)
        await update.message.reply_text("Sorry, an error occurred while analyzing your text.")
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)

    await update.message.reply_text("Would you like to analyze another text? Type /start to begin again.")
    return ConversationHandler.END


# --- Part 2 Flow ---
async def get_p2_question(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data['question'] = update.message.text
    await update.message.reply_text("Got the question. Now, please send me your full essay response.")
    return GET_P2_ESSAY


async def handle_p2_essay(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    student_essay = update.message.text
    original_question = context.user_data.get('question')

    if not original_question:
        await update.message.reply_text("Something went wrong. Please /start again.")
        return ConversationHandler.END

    await update.message.reply_text("Analyzing your Part 2 essay. This may take a minute...")
    await context.bot.send_chat_action(chat_id=update.effective_chat.id, action=ChatAction.TYPING)

    try:
        result = await asyncio.to_thread(run_ielts_part2_agent, original_question, student_essay)
        await update.message.reply_text(result)
    except Exception as e:
        logger.error(f"Error in Part 2 agent: {e}", exc_info=True)
        await update.message.reply_text("Sorry, an error occurred while analyzing your text.")

    await update.message.reply_text("Would you like to analyze another text? Type /start to begin again.")
    return ConversationHandler.END


# --- Fallback & Unknown Handlers ---
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text(
        "Operation cancelled. Type /start when you're ready to try again.", reply_markup=ReplyKeyboardRemove()
    )
    image_path = context.user_data.get('image_path')
    if image_path and os.path.exists(image_path):
        os.remove(image_path)
    return ConversationHandler.END


async def unknown(update: Update, context: ContextTypes.DEFAULT_TYPE):
    logger.warning(f"Unknown command: {update.message.text}")
    await update.message.reply_text("Sorry, I didn't understand that command.")


# --- Async Bot Check ---
async def check_bot_async(token):
    bot = Bot(token)
    info = await bot.get_me()
    print("Bot info:", info)
    wh = await bot.get_webhook_info()
    if wh and wh.url:
        print("Webhook is set. Deleting webhook for polling...")
        await bot.delete_webhook()
        print("Webhook deleted.")
    else:
        print("No webhook set. Good for polling.")


def main() -> None:
    asyncio.run(check_bot_async(TELEGRAM_TOKEN))  # Check bot + webhook before polling

    application = Application.builder().token(TELEGRAM_TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            CHOOSE_PART: [MessageHandler(filters.Regex("^(IELTS Writing Part 1|IELTS Writing Part 2)$"), choose_part)],
            GET_P1_IMAGE: [MessageHandler(filters.PHOTO, get_p1_image)],
            GET_P1_ESSAY: [MessageHandler(filters.TEXT & ~filters.COMMAND, handle_p1_essay)],
            GET_P2_QUESTION: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_p2_question)],
            GET_P2_ESSAY: [MessageHandler(filters.TEXT & ~filters.COMMAND, handle_p2_essay)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    application.add_handler(conv_handler)
    application.add_handler(MessageHandler(filters.COMMAND, unknown))

    print("Bot is running...")
    application.run_polling()


if __name__ == "__main__":
    main()
