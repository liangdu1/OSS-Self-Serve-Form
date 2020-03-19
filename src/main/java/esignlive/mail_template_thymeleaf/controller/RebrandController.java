package esignlive.mail_template_thymeleaf.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import esignlive.mail_template_thymeleaf.email.EmailService;

@Controller
public class RebrandController {

	@Autowired
	private EmailService emailService;

	@GetMapping("/a/rebrand")
	public String index() {
		return "rebrand";
	}

	@RequestMapping(value = "/a/rebrand.do", method = RequestMethod.POST)
	@ResponseBody
	public String rebrand(
			@RequestParam("logo") List<MultipartFile> logos,
			
			@RequestParam("email") String accountEmail, 
			@RequestParam("instance") String instance,
			@RequestParam("payload") String payload
			) throws IOException {
		
		
		//in case logo has duplicated languages
		if(logos!=null && logos.size()>0) {
			Set<String> languages = new HashSet<>();
			Iterator<MultipartFile> iterator = logos.iterator();
			
			while (iterator.hasNext()) {
				MultipartFile next = iterator.next();
				if(!languages.contains(next.getOriginalFilename())) {
					languages.add(next.getOriginalFilename());
				}else {
					iterator.remove();
				}
			}
		}
		
		try {
			 emailService.sendMail(accountEmail,instance,logos,payload);
		} catch (Exception e) {
			// to do
			e.printStackTrace();

		}

		return null;
	}

}
