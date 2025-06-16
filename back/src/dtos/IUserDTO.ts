export interface IUserResponseDTO  {
  id: number,
  firstName: string,
  lastName_1:string,
  email: string,
  
}

export interface IUserRegisterDTO {
  firstName: string,
  middleName?:string,
  lastName_1:string,
  lastName_2?:string,
  birthdate: Date,
  nDni: number,
  parentName: string,
  parentLastname: string,
  email: string,
  username: string;
  password: string;
}