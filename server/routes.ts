import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy route for fetching doctors data since we need to handle CORS
  app.get('/api/doctors', async (req, res) => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors data');
      }
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return res.status(500).json({ error: 'Failed to fetch doctors data' });
    }
  });

  // Mock doctors data endpoint with all doctors
  app.get('/api/mockDoctors', async (req, res) => {
    try {
      // Full mock data array with all doctors
      const mockDoctors = [
        {
          "id":"111418",
          "name":"Dr. Kshitija Jagdale",
          "name_initials":"KJ",
          "photo":"https://doctorlistingingestionpr.azureedge.net/539482078762581145_5a00f31266ed11efbae40ada1afa5198_ProfilePic_crop%20pic.jpg",
          "doctor_introduction":"Dr. Kshitija Jagdale, BDS, has an Experience of 10 years, Graduated from Maharashtra University of Health Sciences, Nashik, currently practising in The Dent Inn Advanced Dental Clinic, Fatima Nagar, Pune",
          "specialities":[
            {
              "name":"Dentist"
            }
          ],
          "fees":"₹ 500",
          "experience":"13 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"The Dent Inn Advanced Dental Clinic",
            "address":{
              "locality":"Wanowrie",
              "city":"Pune",
              "address_line1":"Office No. 6, Parmar Corner 1st Floor",
              "location":"73.901653,18.504216",
              "logo_url":"https://doctorlistingingestionpr.blob.core.windows.net/doctorprofilepic/1632768270309_logo.jpg"
            }
          },
          "video_consult":true,
          "in_clinic":true
        },
        {
          "id":"131682",
          "name":"Dr. Chhaya Vora",
          "name_initials":"CV",
          "photo":"https://doctorlistingingestionpr.azureedge.net/86682006799921180_c2227daee53711eea656ba7c2485ed7e_ProfilePic_IMG-20220927-WA0006.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"Gynaecologist and Obstetrician"
            }
          ],
          "fees":"₹ 400",
          "experience":"39 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Dr. Chaya Vora",
            "address":{
              "locality":"Hadapsar",
              "city":"Pune",
              "address_line1":"Silver plaza aprt opp,Vitthal Rao Shivarkar Road, Fatima Nagar",
              "location":"73.9011205,18.5045484",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"68593",
          "name":"Dr. Murtuza Agashiwala",
          "name_initials":"MA",
          "photo":"https://doctorlistingingestionpr.azureedge.net/372117306642682922_abb27766e52f11ee9680ba7c2485ed7e_ProfilePic_IMG-20211013-WA0001.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"Dentist"
            }
          ],
          "fees":"₹ 250",
          "experience":"19 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Dr Murtaza M. Agashiwala's Clinic",
            "address":{
              "locality":"Wanowrie",
              "city":"Pune",
              "address_line1":"office no.212, C wing",
              "location":"73.90079429950961,18.50399654716649",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"9671",
          "name":"Dr. Shrikant Kulkarni",
          "name_initials":"SK",
          "photo":"https://doctorlistingingestionpr.azureedge.net/1481983295457720_4c0b4c4866e411efa68b0ada1afa5198_ProfilePic_IMG_20211027_113959.jpg",
          "doctor_introduction":"Specialist In Medicine With Long Professional Experience.",
          "specialities":[
            {
              "name":"General Physician"
            }
          ],
          "fees":"₹ 500",
          "experience":"54 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Apollo Clinic",
            "address":{
              "locality":"Kondhwa",
              "city":"Pune",
              "address_line1":"Wanowrie",
              "location":"73.89639286142841,18.479461810522366",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"14305",
          "name":"Dr. M Mundada",
          "name_initials":"MM",
          "photo":"https://doctorlistingingestionpr.azureedge.net/207199418275771391_1871af2ce51f11eeb26fb25703702161_ProfilePic_IMG-20220407-WA0000.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"General Physician"
            }
          ],
          "fees":"₹ 250",
          "experience":"48 Years of experience",
          "languages":[
            "English",
            "हिन्दी"
          ],
          "clinic":{
            "name":"Arnav Clinic",
            "address":{
              "locality":"Wanowrie",
              "city":"Pune",
              "address_line1":"Opp Clover Hights",
              "location":"73.90409431246731,18.48223973940462",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"25360",
          "name":"Dr. Shubhada Deoskar",
          "name_initials":"SD", 
          "photo":"https://doctorlistingingestionpr.azureedge.net/271496298776831315_69ac9c9c461c11ed9cf9d24fe9d70b08_ProfilePic_ProfilePic_IMG-20220930-WA0018%20%281%29.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"Gynaecologist and Obstetrician"
            }
          ],
          "fees":"₹ 600",
          "experience":"40 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Dr. Shubhada Deoskar",
            "address":{
              "locality":"Wanwadi",
              "city":"Pune",
              "address_line1":"Clover Village",
              "location":"73.89715,18.48431",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"110857",
          "name":"Dr. Khushi Patel",
          "name_initials":"KP",
          "photo":"https://doctorlistingingestionpr.azureedge.net/53155314380258887_be1d0c2675a411ef98f1b60948eee953_ProfilePic_Khushi%20Patel%20PIC.jpg",
          "doctor_introduction":"Dr. Khushi Patel, BDS, has an Experience of 27 years, Graduated from Bharati Vidyapeeth Dental College and Hospital, Pune, currenlty practising in Dr Khushis Dental Planet, Fatima Nagar, Pune",
          "specialities":[
            {
              "name":"Dentist"
            }
          ],
          "fees":"₹ 300",
          "experience":"31 Years of experience",
          "languages":[
            "English",
            "ગુજરાતી",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Dr Khushi's Dental Planet",
            "address":{
              "locality":"Wanowrie",
              "city":"Pune",
              "address_line1":"Flat no 4,1st floor, Krishna house,diamond bakery",
              "location":"73.9018781,18.5048839",
              "logo_url":""
            }
          },
          "video_consult":true,
          "in_clinic":false
        },
        {
          "id":"113690",
          "name":"Dr. Munaf Inamdar",
          "name_initials":"MI",
          "photo":"https://doctorlistingingestionpr.azureedge.net/59381340713910760_3d65c720a94011ee8647b22c281c2b87_ProfilePic_ProfilePic_IMG_20220620_131507.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"General Physician"
            }
          ],
          "fees":"₹ 600",
          "experience":"27 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Apex Multispeciality and Maternity Hospital",
            "address":{
              "locality":"Kondhawa Khurd",
              "city":"Pune",
              "address_line1":"S No. 15, Vitthal Rao Shivarka",
              "location":"73.89999369746825,18.503394020122766",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"84141",
          "name":"Dr. Abdul Danish",
          "name_initials":"AD",
          "photo":"https://doctorlistingingestionpr.azureedge.net/410151505984132444_0912b3a62fc411ef98d7eebe0baffa56_ProfilePic_ProfilePic_Dr.jpg",
          "doctor_introduction":"Dr. Abdul Rahman Danish, MBBS, MPH, Critical Care Medicine, has an Experience of 6 years",
          "specialities":[
            {
              "name":"General Physician"
            }
          ],
          "fees":"₹ 600",
          "experience":"9 Years of experience",
          "languages":[
            "English",
            "हिन्दी"
          ],
          "clinic":{
            "name":"Inamdar Multispeciality Hospital",
            "address":{
              "locality":"Wanowrie",
              "city":"Pune",
              "address_line1":"S No. 15, Vitthal Rao Shivarkar Road,",
              "location":"73.89999101446442,18.50318672053397",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        },
        {
          "id":"15622",
          "name":"Dr. Mufaddal Zakir",
          "name_initials":"MZ",
          "photo":"https://doctorlistingingestionpr.azureedge.net/219273030912802020_30a6a7cce51b11ee912dba7c2485ed7e_ProfilePic_Profile%20Pic.jpg",
          "doctor_introduction":"",
          "specialities":[
            {
              "name":"General Physician"
            }
          ],
          "fees":"₹ 600",
          "experience":"27 Years of experience",
          "languages":[
            "English",
            "हिन्दी",
            "मराठी"
          ],
          "clinic":{
            "name":"Sparsh Polyclinic..",
            "address":{
              "locality":"Wanwadi",
              "city":"Pune",
              "address_line1":"First Floor, Regency Arcade",
              "location":"73.8990195,18.4885036",
              "logo_url":""
            }
          },
          "video_consult":false,
          "in_clinic":true
        }
      ];
      
      return res.json(mockDoctors);
    } catch (error) {
      console.error('Error serving mock doctors:', error);
      return res.status(500).json({ error: 'Failed to serve mock doctors data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
