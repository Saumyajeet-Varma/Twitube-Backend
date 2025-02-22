const asyncHandler = (fn) => {

    return (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .reject(err => next(err))
    }
}

export default asyncHandler;