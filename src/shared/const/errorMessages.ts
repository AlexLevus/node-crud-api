const errorMessages = {
    incorrectJSON: 'JSON is incorrect',
    incorrectId: 'Provided id is incorrect',
    entityWithIdNotExist: (entity: string) => `${entity} with this id does not exist`,
    missingRequiredFields: (fields: string[]) => `Required fields (${fields.join(', ')}) must be provided`,
    routeNotExist: 'This route does not exist'
}

export default errorMessages