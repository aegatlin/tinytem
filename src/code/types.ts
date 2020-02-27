export class CTodo {
  _id: string
  title: string
  completed: boolean
  user: CUser
}

export class CUser {
  _id: string
  authId: string
  todos: {
    data: CTodo[]
  }
}
