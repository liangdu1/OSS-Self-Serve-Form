package esignlive.mail_template_thymeleaf.service;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;


@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;
	
	public void sendMail(Map<String,Set<String>> clientMap,String emailSubject, String emailBody) throws IOException, MessagingException {
		System.out.println(clientMap);
		System.out.println(emailSubject);
		System.out.println(emailBody);
		MimeMessage message = emailSender.createMimeMessage();

		for(Map.Entry<String,Set<String>> entry : clientMap.entrySet()) {
			Set<String> emails = entry.getValue();
			
			try {
				MimeMessageHelper helper = new MimeMessageHelper(message, true);
	
				helper.setFrom("support@esignlive.com");
				helper.setTo(emails.toArray(new String[emails.size()]));
				helper.addCc("ahmad.hattab@onespan.com");
	//			helper.addBcc(accountEmail);
				helper.setSubject(emailSubject);
	
				Context context = new Context();
				context.setVariable("emailBody", emailBody);
				String html = templateEngine.process("outageTemplate", context);
				helper.setText(html,true);		
	
			} catch (MessagingException e) {
				throw new MailParseException(e);
			}
			emailSender.send(message);
		}
	}

	public void testSend(String emailSubject, String emailBody) {
		System.out.println(emailSubject);
		System.out.println(emailBody);
		
		MimeMessage message = emailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom("support@esignlive.com");
			helper.setTo("ahmad.hattab@onespan.com");
			helper.setSubject(emailSubject);

			Context context = new Context();
			context.setVariable("emailBody", emailBody);
			String html = templateEngine.process("outageTemplate", context);
			helper.setText(html,true);		

		} catch (MessagingException e) {
			throw new MailParseException(e);
		}
		emailSender.send(message);
	}

}