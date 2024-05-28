export default function ({ store ,redirect }){
  if (process.client){
    store.dispatch('initializeAuth')
  }
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
