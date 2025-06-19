interface Iuser {
  id: number,
  pacientFirstName: string;
  pacientMiddleName: string;
  pacientFirstLastName: string;
  pacientSecondLastName: string;
  birthdate: Date,
  nDni: number,
  parentName: string,
  parentLastName: string,
  email: string,
  credentialsId: number,
}

export default Iuser
