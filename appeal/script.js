document.addEventListener('DOMContentLoaded', () => {
    const appealForm = document.getElementById('appealForm');
    const messageElement = document.getElementById('message');

    appealForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        messageElement.textContent = ''; // Очищаем предыдущие сообщения
        messageElement.className = 'hidden'; // Скрываем сообщение

        const formData = new FormData(appealForm);

        // ВАЖНО: Замените 'YOUR_GOOGLE_FORM_ACTION_URL' на URL вашей Google Form
        // и 'entry.XXXXXXXXX' на реальные ID полей вашей Google Form.
        // Инструкции, как найти эти ID, приведены ниже.
        const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSelLtFeoutLEvLAzAEnsFtpKfjEYRl4anFtP5k5FoJ0MwnYsw/formResponse'; // Пример: https://docs.google.com/forms/d/e/1FAIpQLSd_abc123def456ghi789jkl/formResponse

        // Создаем объект URLSearchParams для корректной отправки данных в Google Forms
        const params = new URLSearchParams();
        // Замените 'entry.XXXXXXXXX' на фактические ID полей вашей Google Form
        // Для поля "Ник нарушителя"
        params.append('entry.840550611', formData.get('violatorNickname')); 
        // Для поля "ID наказания"
        params.append('entry.220217179', formData.get('punishmentId'));    
        // Для поля "Оправдание"
        params.append('entry.238330568', formData.get('justification'));  

        try {
            // Отправляем данные формы с помощью Fetch API
            const response = await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors', // Важно для кросс-доменных запросов к Google Forms
                body: params
            });

            // Поскольку mode: 'no-cors', мы не можем проверить response.ok
            // Просто предполагаем успешную отправку для Google Forms,
            // так как ошибка сети будет перехвачена блоком catch.
            
            messageElement.textContent = 'Ваше оспаривание успешно отправлено! Спасибо.';
            messageElement.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-400');
            messageElement.classList.remove('hidden');
            appealForm.reset(); // Очищаем форму после успешной отправки

        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            messageElement.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
            messageElement.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-400');
            messageElement.classList.remove('hidden');
        }
    });
});
