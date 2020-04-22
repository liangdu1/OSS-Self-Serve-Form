package esignlive.mail_template_thymeleaf.service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import au.com.bytecode.opencsv.CSVReader;
@Service
public class CSVService {

	public Map<String,Set<String>> openCSV(InputStream inputStream) {
        Map<String,Set<String>> clientMap = new HashMap<String,Set<String>>();

        try (   InputStreamReader isr = new InputStreamReader(inputStream);
                CSVReader reader = new CSVReader(isr)) {
            String[] line;
            final Set<String> columnSet = new HashSet<String>() {{
            	add("client");
            	add("emaillist");
            }};
            
            while ((line = reader.readNext()) != null) {
	             boolean isTitle = false;
            	 for(int index = 0; index < line.length; index++) {
            		 if(columnSet.contains(line[index].trim().toLowerCase())) {
	            		 isTitle = true;
	            	 }
            	 }
             	 if(isTitle) {
	                 continue;
	             }
	             
             	 String client = line[0].trim();
             	 String email = line[1].trim();
             	 if(email.endsWith(";")) {
             		 email = email.substring(0, email.length()-1);
             	 }
             	 final String clientEmail = email;
             	 if(!clientMap.containsKey(client)) {
             		clientMap.put(client, new HashSet<String>() {{add(clientEmail);}});
             	 }else {
             		 clientMap.get(client).add(clientEmail);
             	 }
            }
            
            
            System.out.println(clientMap);
        } catch (Exception e1) {
			e1.printStackTrace();
		}
		return clientMap;
	}

	
	
    
    
}
