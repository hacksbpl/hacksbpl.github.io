window.addEventListener("_event_onInitializeFirebase", (event) =>
{
    firebase.initializeApp(event.detail.configuration);
});
window.addEventListener("_event_onSetData", (event) =>
{
    firebase.database().ref(event.detail.reference).set(event.detail.data);
});
window.addEventListener("_event_onAppendData", (event) =>
{
    firebase.database().ref(event.detail.reference).push().set(event.detail.data, (err) =>
    {
        if (err)
        {
            event.detail.onError();
        }
        else
        {
            event.detail.onComplete();
        }
    });
});
window.addEventListener("_event_onUpdateData", (event) =>
{
    firebase.database().ref(event.detail.reference).update(event.detail.data);
});
window.addEventListener("_event_onGetData", (event) =>
{
    let sent = false;
    firebase.database().ref(event.detail.reference).on("value", (e) =>
    {
        if (!sent)
        {
            sent = true;
            event.detail.callback(e.val());
        }
    });
});