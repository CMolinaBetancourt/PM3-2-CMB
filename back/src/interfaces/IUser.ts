interface Iuser {
  id: number,
  firstName: string,
  middleName?:string,
  firstLastName:string,
  secondLastName?:string,
  birthdate: Date,
  nDni: number,
  parentName: string,
  parentLastName: string,
  email: string,
  credentialsId: number,
}

export default Iuser
