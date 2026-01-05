import bcrypt  from "bcrypt"

const saltRounds = 10;
const myPlaintextPassword = 'Mypass123';
// const someOtherPlaintextPassword = 'not_bacon';


const hash1 =await bcrypt.hash(myPlaintextPassword, saltRounds);
const hash2 =await bcrypt.hash(myPlaintextPassword, saltRounds);


const comper = await bcrypt.compare(myPlaintextPassword, hash1);

console.log(myPlaintextPassword,hash1);
console.log(myPlaintextPassword,hash2);
console.log(comper);

