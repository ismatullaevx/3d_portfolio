export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, emailOrPhone, message } = req.body;

  // Basic validation
  if (!name || !emailOrPhone || !message) {
    return res.status(400).json({ error: "Name, email/phone and message are required" });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "Telegram configuration is missing" });
  }

  // Format message
  const telegramMessage = `📩 <b>New Message!</b>\n\n👤 <b>Name:</b> ${name}\n📞 <b>Contact:</b> ${emailOrPhone}\n💬 <b>Message:</b> ${message}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API Error:", errorData);
      return res.status(500).json({ error: "Failed to send message to Telegram" });
    }

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
