const propertiesTable = $('.properties');
const newRow = `<tr> <td> <input type=text class="property-name form-control" required> </td> <td> <select class="property-type form-control"> <option value="string">String</option> <option value="int">Int</option> <option value="double">Double</option> </select> </td> <td> <button type="button" class="btn btn-danger delete">Delete</button> </td> </tr> <tr>`;
const textareaCode = ` <div class="form-group codeToShow mt-5"> <h4 class="text-center">Generated Code: </h4> <textarea id="code" rows="10" class="form-control"></textarea> </div>`;

 $('form').submit((e) => e.preventDefault());
 $('.delete').click(deleteRow);

 function addRow()
 { propertiesTable.append(newRow);
 $('.delete').click(deleteRow);
 }

 function deleteRow() {
	 $(this).parent().parent().remove();
}

function copycode() {
    var copyText = document.getElementById("code");
    copyText.select();
    document.execCommand("copy");
}
	 function generateCode() {
	 if($(`input:required:invalid`).length > 0)
		 { return; } $('.codeToShow').remove();
	 let className = $('#className').val();
	 let code = ` // Start s obiknovenni neshta
 #include <iostream>
 #include <string>
 #include <vector>
 #include <list>
 #include <exception>
 
 using namespace std;
 
 class ${className}
 {
 //Chlen Promenlivi, Chastni Promenlivi: 
 private:
`;
 let propertyNames = $('.property-name');
 let propertyTypes = $('.property-type');

 for(let i = 0; i < propertyNames.length; i++)
 {
    code += ` ${$(propertyTypes[i]).val()} ${$(propertyNames[i]).val()}; \n`;
 }
 code += `\n`;
 code += ` public:\n`;
 code += ` //GET/SET funkcii, Akcesori i Mutatori, Funkcii za chetene i zapis
`;
 for(let i = 0; i < propertyNames.length; i++)
 {
 let name = $(propertyNames[i]).val();
 let capitalized = name.charAt(0).toUpperCase() + name.slice(1);
 code += ` ${$(propertyTypes[i]).val()} get${capitalized}() \n`;
 code += ` {\n`; code += `     return ${$(propertyNames[i]).val()};\n`; code += ` }\n\n`; code += ` void set${capitalized}(${$(propertyTypes[i]).val()} ${name}_i) \n`; code += ` {\n`; code += `     ${$(propertyNames[i]).val()} = ${name}_i;\n`; code += ` }\n\n`;
 }

 code += ` //Konstuktor po podrazbirane:\n`;
 code += ` ${className}()\n`;
 code += ` {\n`;
 for(let i = 0; i < propertyNames.length; i++)
 {
    code += `     ${$(propertyNames[i]).val()} = `;

    if(`${$(propertyTypes[i]).val()}` === "string")
    {
        code += `"";
`;
    }
    else
    {
        code += `0;
`;
    }
 }

         code += ` }
 

`;

 code += ` //Ekspliciten Konstruktor:\n`;
 code += ` ${className}(`;
 for(let i = 0; i < propertyNames.length; i++)
 {
     code += `${$(propertyTypes[i]).val()} ${$(propertyNames[i]).val()}_i`;

     if (i != propertyNames.length - 1) {
         code += `, `;
     }
 }

 code += `)
 {
`;
         for(let i = 0; i < propertyNames.length; i++)
         {
             code += `     ${$(propertyNames[i]).val()} = ${$(propertyNames[i]).val()}_i;
`;
         }
 code += ` }

`;

code += ` //Kopirasht Konstruktor
`;
code += ` ${className}(const ${className}& ${className.toLowerCase()}_i)
 {
`;
         for(let i = 0; i < propertyNames.length; i++)
         {
             code += `    ${$(propertyNames[i]).val()} = ${className.toLowerCase()}_i.${$(propertyNames[i]).val()};
`;
         }

code += ` }

`;

code += `//predefinirane na operatora < po otnoshenie na chlen promenlivata ${$(propertyNames[0]).val()}
 bool operator<(${className} ${className.toLowerCase()}_i)
 {
    return ${$(propertyNames[0]).val()} < ${className.toLowerCase()}_i.${$(propertyNames[0]).val()};
 }`;

         code += `
};\n`;

code += `

//Predefinirane na operator za izhod, izvezdane cherez fajlov potok
`;
code += `ostream& operator<<(ostream &stream, ${className} &${className.toLowerCase()}_i)
{
`;
         for(let i = 0; i < propertyNames.length; i++)
         {
             let name = $(propertyNames[i]).val();
             let capitalized = name.charAt(0).toUpperCase() + name.slice(1);

             code += `    stream << "${$(propertyNames[i]).val()}: " << ${className.toLowerCase()}_i.get${capitalized}() << endl;
`;
         }

         code += `    return stream;
`;
code += `}`;

         code += `

//Predefinirane na operator za vhod, vavezdane cherez fajlov potok
`;
         code += `istream& operator>>(istream &stream, ${className} &${className.toLowerCase()}_i)
{
`;
         for(let i = 0; i < propertyNames.length; i++)
         {
             let name = $(propertyNames[i]).val();
             let capitalized = name.charAt(0).toUpperCase() + name.slice(1);
             code += `    ${$(propertyTypes[i]).val()} ${$(propertyNames[i]).val()}_i;
`;
             code += `    stream >> ${$(propertyNames[i]).val()}_i;
`;
             code += `    ${className.toLowerCase()}_i.set${capitalized}(${$(propertyNames[i]).val()}_i);           
`;
         }

         code += `    return stream;
`;
         code += `}
`;

         code += `

//Chast 2         
class Extend
{
    //Chlen Promenlivi, Chastni Promenlivi
    private:
    string name;
    vector<${className}> collection;
    
    public:
    //GET funkcii, akcesori, funkcii za dostap, funkcii za chetene
    string getName()
    {
        return name;
    }
    
    vector<${className}> getCollection()
    {
        return collection;
    }
    
    //SET funkcii, mutatori, funkcii za zapis, funkcii za redaktirane
    void setName(string name_i)
    {
        name = name_i;
    }
    
    void setCollection(vector<${className}> collection_i)
    {
        collection = collection_i;
    }
    
    //predefinirane na operatora <= po otnoshenie na chlen promenlivata name
    bool operator<=(Extend extend_i)
    {
        return name <= extend_i.name;
    }
    
    //Kontruktor po podrazbirane
    Extend()
    {
        name = "";
    }
    
    //EksplicitenKonstruktor
    Extend(string name_i)
    {
        name = name_i;
    }
    
    //Kopirasht Konstruktor
	Extend(const Extend& extend_i)
	{
		name = extend_i.name;
		collection = extend_i.collection;
	}
};

//Predefinirane na operator za vhod, vavezdane cherez fajlov potok
//Bi se nuzdaelo ot redakciq za da raboti ako e LIST, NO DA SE PISHE NA IZPIT
istream& operator>>(istream &stream, Extend  &extend_i)
{
    vector<${className}> newCollection;
    
    string name_i;
    stream >> name_i;
    extend_i.setName(name_i);
    

    for(int i = 0; i < 3; i++)
    {
        ${className} ${className.toLowerCase()}_i;
        stream >>  ${className.toLowerCase()}_i;
        newCollection.push_back(${className.toLowerCase()}_i);
    }
    
    extend_i.setCollection(newCollection);
    
    return stream;
}

//Predefinirane na operator za izhod, izvezdane cherez fajlov potok
//Bi se nuzdaelo ot redakciq za da raboti ako e LIST, NO DA SE PISHE NA IZPIT
ostream& operator<<(ostream &stream, Extend  &extend_i)
{
    stream << "name: " << extend_i.getName() << endl;

    for(int i = 0; i < 3; i++)
    {
        stream << extend_i.getCollection()[i] << endl;
    }
    
    return stream;
}`;

         code += `

//Chast 3
//Demonstraciq na klasovete i funkciite im v glavnata funkciq kakto i obrabotka na greshki
void main()
{
   try { 
   ${className} ${className.toLowerCase()}_1;
   ${className} ${className.toLowerCase()}_2;
   
   cin >> ${className.toLowerCase()}_1;
   cin >> ${className.toLowerCase()}_2;
   
   cout << "- - - - - - - - - - - - - -" << endl;
   
   cout << ${className.toLowerCase()}_1 << endl;
   cout << ${className.toLowerCase()}_2 << endl;
   
   Extend extend_test("testName");
   
   Extend extend;
   cin >> extend; //NE RABOTI AKO E LIST NO DA SE PISHE NA IZPIT
   cout << "- - - - - - - - - - - - - -" << endl;
   cout << extend; //NE RABOTI AKO E LIST NO DA SE PISHE NA IZPIT
   }    catch(exception error)
        {
            cout << error.what() << endl;
        }
}`;

         if($('#copy-code') !== null) {
             $('#copy-code').remove();
         }

 $('form').append(textareaCode);
 $('form').append('<button type="button" onclick="copycode()" id="copy-code" class="btn btn-info generate">Copy Code</button>');
 $('textarea').val(code);
 }
