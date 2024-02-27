// TASK BOARD
module.exports.taskBoard = async (req, res) => {
    try {
        res.render('taskBoard/index.html');
    } catch (error) {
        Response.send(res, {
            statusCode: 400,
            messageKey: 'general.something_wrong',
            data: {
                description: error.message
            }
        });
    }
}