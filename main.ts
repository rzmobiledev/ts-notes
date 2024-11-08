// Index Signatures
interface TransactionObj {
    readonly [index: string]: number
    Pizza: number
    Books: number
    Job: number
}

// interface TransactionObj {
//     readonly [index: string]: number
// }


const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50,
}

console.log(todaysTransactions.Pizza)
console.log(todaysTransactions['Pizza'])

let prop: string = 'Pizza'
console.log(todaysTransactions[prop])

const todaysNet = (transactions: TransactionObj): number => {
    let total = 0
    for (const transaction in transactions){
        total += transactions[transaction]
    }
    return total
}

console.log(todaysNet(todaysTransactions))

console.log(todaysTransactions['Dave'])

////////////////////////////////////////

interface Student {
    // [key: string]: string | number | number[] | undefined
    name: string
    GPA: number
    classes?: number[]
}

const student: Student = {
    name: 'Doug',
    GPA: 3.5,
    classes: [100, 200]
}


for (const key in student){
    console.log(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => console.log(student[key as keyof typeof student]))

const logStudenKey = (student: Student, key: keyof Student): void => {
    console.log(`Student ${key}: ${student[key]}`)
}

logStudenKey(student, 'name')

/////////////////////////////////////////////

// interface Incomes {
//     [key: string]: number
// }

type Streams = 'salary' | 'bonus' | 'sidehustle'

type Incomes = Record<Streams, number>

const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
}

for (const revenue in monthlyIncomes){
    console.log(monthlyIncomes[revenue as keyof Incomes])
}


//=================================== GENERIC
const echo = <T>(arg: T): T => arg

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

console.log(isObj(true))
console.log(isObj('John'))
console.log(isObj([1,2,3]))
console.log(isObj({ name: 'John' }))


interface BoolCheck<T> {
    value: T,
    is: boolean
}

const isTrue = <T>(arg: T): BoolCheck<T> => {
    
    if (Array.isArray(arg) && !arg.length){
            return {
                value: arg, is: false
            }
        }
    
    if(isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { value: arg, is: false }
    } 

    return {
        value: arg, is: !!arg
    }
}

// console.log(isTrue(false))
// console.log(isTrue(0))
// console.log(isTrue(true))
// console.log(isTrue(1))
// console.log(isTrue('Dave'))
// console.log(isTrue(null))
// console.log(isTrue(undefined))
// console.log(isTrue({ name: 'Dave'}))





interface HasID {
    id: number
}

const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map(user => user[key])
}

const usersArray = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "kulast Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company":{
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered",
            "bs": "harness real-time e-markets"
        }
    }
]

console.log(getUsersProperty(usersArray, "website"));
console.log(getUsersProperty(usersArray, "address"));


class StateObject<T> {
    private data: T

    constructor(value: T){
        this.data = value
    }

    get state(): T {
        return this.data
    }

    set state(value: T) {
        this.data = value
    }
}

const store = new StateObject(12)
console.log(store.state)
store.state = 15
console.log(store.state)

const myState = new StateObject<(string | number | boolean)[]>([15]);
myState.state = ['Dave', 43, true]
console.log(myState.state)


//////////////////////////////////////////////
//   Utility types



// Partial

interface Assignment {
    studentId: string
    title: string
    grade: number
    verified?: boolean
}

const updateAssignment = (assign: Assignment, propsToUpdate: 
    Partial<Assignment>): Assignment => {
    return { ... assign, ...propsToUpdate}
}

const assign1: Assignment = {
    studentId: "compsci123",
    title: "Final Project",
    grade: 0
}

console.log(updateAssignment(assign1, { grade: 95 }));


// Required and Readonly
const assignGraded: Assignment = updateAssignment(assign1, { grade: 92 })
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // send to database etc.
    return assign
}

const assignVerified: Readonly<Assignment> = {
    ...assignGraded, verified: true
}

recordAssignment({...assignGraded, verified: true})


// Record

const HexColorMap: Record<string, string> = {
    red: "FF000",
    green: "00FF00",
    blue: "0000F"
}

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "C"
}

interface Grades {
    assign1: number
    assign2: number
}

const gradeData: Record<Students, Grades> = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 16 },
}

// Pick and Omit
type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
    studentId: "k123",
    grade: 85,
}

type AssignPreview = Omit<Assignment, "grade" | "verified">

const preview: AssignPreview = {
    studentId: "K123",
    title: "Final Project"
}

// Exclude and Extract
type adjustedGrade = Exclude<LetterGrades, "U">

type highGrades = Extract<LetterGrades, "A" | "B">

// Non Nullable
type AllPossibleGrades = "Dave" | "John" | null | undefined
type NamesOnly = NonNullable<AllPossibleGrades>


// ReturnType 

// type newAssign = { title: string, points: number }

const createNewAssign = (title: string, points: number) => {
    return { title, points }
}

type newAssign = ReturnType<typeof createNewAssign>

const tAssign: newAssign = createNewAssign("Utility Types", 100);
console.log(tAssign)


//  Parameters

type AssignParams = Parameters<typeof createNewAssign>
const assignArgs: AssignParams = ["Generics", 100]

const tsAssign2: newAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)


// AWaited - helps us with the ReturnType of a Promise

interface User {
    id: number
    name: string
    username: string
    email: string
}

const fetchUsers = async (): Promise<User[]> => {
    const data = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    ).then(res => res.json())
    .catch(err => {
        if(err instanceof Error) console.log(err.message)
    });
    return data
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>

fetchUsers().then(users => console.log(users))

