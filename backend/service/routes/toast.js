module.exports = function(app, workspaceApi) {

  app.get('/system/toast', async (req, res) => {
    try {
      const toastID = workspaceApi.system.popupToast({
        title: 'Testing',
        subject: 'Uh oh',
        message: 'Looks like your caller is upset',
      })
    } catch(err) {
      console.log(err)
    }
  })
}