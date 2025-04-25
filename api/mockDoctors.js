// Serverless function to provide mock doctor data
export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Mock data array from the provided JSON
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
        "doctor_introduction":"Specialist In Medicine With Long Professional Experience.Worked Both In India And Abroad.Conducting International Research Project Since 2014 On Primary prevention Of Ischemic Heart Disease.I Have Been Postgraduate Teacher And Examiner At Universities Since Long.I Have International Paper Publication.Since The Pandemic Of Covid..Started Treatment For Covid Patients For Last One Year.",
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
          "name":"Apollo Clinic..",
          "address":{
            "locality":"Kondhwa",
            "city":"Pune",
            "address_line1":"Amba Vatika, Plot No. B-1, Survey No. 16a/2, Wanowrie,",
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
          "name":"Arnav Clinic.",
          "address":{
            "locality":"Wanowrie",
            "city":"Pune",
            "address_line1":"Opp Clover Hights, Azad Nagar Road Maestros Phase 2",
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
            "address_line1":"101, New Market Plaza, Clover Village",
            "location":"73.89715,18.48431",
            "logo_url":""
          }
        },
        "video_consult":false,
        "in_clinic":true
      }
    ];
    
    // Return the mock data
    res.status(200).json(mockDoctors);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Failed to fetch doctors data' });
  }
} 