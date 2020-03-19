package esignlive.mail_template_thymeleaf.email;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

//	public void sendSimpleMessage(Mail mail) throws MessagingException, IOException {
//		MimeMessage message = emailSender.createMimeMessage();
//		MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
//				StandardCharsets.UTF_8.name());
//
//		Context context = new Context();
//		context.setVariables(mail.getModel());
//		String html = templateEngine.process("email-template", context);
//
//		helper.setTo(mail.getTo());
//		helper.setText(html, true);
//		helper.setSubject(mail.getSubject());
//		helper.setFrom(mail.getFrom());
//
//		emailSender.send(message);
//	}

	public void sendMail(String accountEmail, String instance, List<MultipartFile> logoFiles, String payload) throws IOException {

		MimeMessage message = emailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom("liangduo1993@gmail.com");
			helper.setTo("oss.duoliang@gmail.com");
			helper.addBcc(accountEmail);
			StringBuilder sb = new StringBuilder(100);
			sb.append("[OSS rebrand] Account ").append(accountEmail).append(" requests for rebranding in ")
					.append(instance);
			helper.setSubject(sb.toString());

			String content = "Account Email: %s\r\n" + "Instance: %s\r\n" + "Payload: %s";
			helper.setText(String.format(content, accountEmail, instance, payload));		for (MultipartFile logoFile : logoFiles) {
				String filename = logoFile.getOriginalFilename();
//				String extension = FilenameUtils.getExtension(filename);
				helper.addAttachment(filename ,
						new ByteArrayResource(IOUtils.toByteArray(logoFile.getInputStream())));
			}

			System.out.println(accountEmail + " : " + instance);
		} catch (MessagingException e) {
			throw new MailParseException(e);
		}
		emailSender.send(message);
	}

//	public void sendRebrandEmail(String accountEmail, String instance, byte[] logoBytes)
//			throws MessagingException, IOException {
//		Mail mail = new Mail();
//		mail.setFrom("liangduo1993@gmail.com");
//		mail.setTo("ld930423@163.com");
//		StringBuilder sb = new StringBuilder(100);
//		sb.append("[OSS rebrand] Account ").append(accountEmail).append(" requests for rebranding in ")
//				.append(instance);
//		mail.setSubject(sb.toString());
//
//		Map<String, String> model = new HashMap<>();
//		model.put("accountEmail", accountEmail);
//		model.put("instance", instance);
//		mail.setModel(model);
//		sendSimpleMessage(mail);
//
//	}

}