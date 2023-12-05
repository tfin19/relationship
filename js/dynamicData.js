    const fs = require('fs');
 
	const letterID = '46' 
  	const membersList = []
	const letters = []
    const data = []


    async function getMembers() {

        // using the Fetch API to get collection info
        const response = await (fetch('https://georgeeliotarchive.org/api/items?collection=19'))
        const members = await response.json()

    // iterates through the JSON to get desired information of each member of the collection  
	for (let i = 0, l = members.length; i < l; i++) {   
        
        for (let j = 0, k = members[i].element_texts.length; j < k; j++) {  
            if (members[i].element_texts[j].element.id == letterID) {  // finds letters by matching ID
                 letters[i] = members[i].element_texts[j].text;
                 break;
            } 
            else {
                letters[i] = ''
            }  
        }
		let member = {

                  "name": members[i].element_texts[0].text,
				  "bio": members[i].element_texts[1].text,
				  "letters": letters[i]
            }
	    membersList.push(member)
       
    }
	

    for(let i = 0; i < members.length; i++) {
        data.push("\n\"" + membersList[i].name + "\"")
        data.push("\"" + membersList[i].bio + "\"")
        data.push("\"" + membersList[i].letters + "\"")
    }
    

    fs.writeFile("dynamicData.csv", "FullName,Biography,Letters" + data, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("success");
      });   
    };
getMembers()

