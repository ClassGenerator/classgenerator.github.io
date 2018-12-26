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
 
 using namespace std;
 
 class ${className}
 {
 
 //Chlen Promenlivi: 
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

         code += `  return stream;
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

         code += `  return stream;
         `;
         code += `}
`;

code += `
//Demonstraciq na klasa i funkcionalnosta mu v glavnata funkciq
void main()
{
   ${className} ${className.toLowerCase()}_1;
   ${className} ${className.toLowerCase()}_2;
   ${className} ${className.toLowerCase()}_3;
   
   cin >> ${className.toLowerCase()}_1;
   cin >> ${className.toLowerCase()}_2;
   cin >> ${className.toLowerCase()}_3;
   
   cout << "- - - - - - - - - - - - - -" << endl;
   
   cout << ${className.toLowerCase()}_1 << endl;
   cout << ${className.toLowerCase()}_2 << endl;
   cout << ${className.toLowerCase()}_3 << endl;
}`;

         if($('#copy-code') !== null) {
             $('#copy-code').remove();
         }

 $('form').append(textareaCode);
 $('form').append('<button type="button" onclick="copycode()" id="copy-code" class="btn btn-info generate">Copy Code</button>');
 $('textarea').val(code);
 }