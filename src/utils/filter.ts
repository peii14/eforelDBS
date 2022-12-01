export const filteredPeople = (query:string, people) =>{
    return query === ''? people
    : people.filter((person) =>
    person.name
    .toLowerCase()
    .replace(/\s+/g, '')
    .includes(query.toLowerCase().replace(/\s+/g, ''))
    )
}