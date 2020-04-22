package esignlive.mail_template_thymeleaf.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import esignlive.mail_template_thymeleaf.service.CSVService;
import esignlive.mail_template_thymeleaf.service.EmailService;

@Controller
public class TrustCenterController {

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private CSVService csvService;

	@GetMapping("/a/trustcenter")
	public String index() {
		return "trustcenter";
	}

	@RequestMapping(value = "/a/trueSend.do", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Map<String, Set<String>>> trueSend(
			@RequestParam("clientlist") MultipartFile clientlist,
			@RequestParam("emailSubject") String emailSubject,
			@RequestParam("emailBody") String emailBody
			) throws IOException {
		try {
			Map<String, Set<String>> openCSV = csvService.openCSV(clientlist.getInputStream());
			emailService.sendMail(openCSV,emailSubject,emailBody);
	        return ResponseEntity.ok()
	                .body(openCSV);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();			
		}
	}
	
	
	@RequestMapping(value = "/a/testSend.do", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Void> testSend(
			@RequestParam("emailSubject") String emailSubject,
			@RequestParam("emailBody") String emailBody
			) throws IOException {
		try {
			emailService.testSend(emailSubject,emailBody);
	        return ResponseEntity.ok().build();
	        
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();			
		}
	}
	
}
