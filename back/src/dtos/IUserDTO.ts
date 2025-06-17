export interface IUserResponseDTO  {
  id: number,
  firstName: string,
  firstLastName:string,
  email: string,
  
}

export interface IUserRegisterDTO {
  firstName: string,
  middleName?:string,
  firstLastName:string,
  secondLastName?:string,
  birthdate: Date,
  nDni: number,
  parentName: string,
  parentLastName: string,
  email: string,
  username: string;
  password: string;
}