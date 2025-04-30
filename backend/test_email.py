import os
import django
from django.core.mail import send_mail
from dotenv import load_dotenv

# Загружаем переменные из .env
load_dotenv()

# Устанавливаем настройки Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django.setup()

# Отправка письма
send_mail(
    subject='Тестовое письмо от Django',
    message='Если ты видишь это письмо — значит всё работает! 😊',
    from_email=os.getenv("GMAIL_USER"),
    recipient_list=[os.getenv("GMAIL_USER")],  # письмо самому себе
    fail_silently=False,
)

print("✅ Письмо отправлено успешно!")