interface Iuser {
  id: number,
  firstName: string,
  middleName?:string,
  lastName_1:string,
  lastName_2?:string,
  birthdate: Date,
  nDni: number,
  parentName: string,
  parentLastname: string,
  email: string,
  credentialsId: number,
}

export default Iuser
