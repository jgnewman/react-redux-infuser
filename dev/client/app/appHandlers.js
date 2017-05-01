export function clickMe(evt) {
  const { helpers, appActions, miscActions } = this.props;
  evt && evt.preventDefault();
  helpers.logStuff()
  appActions.updateFoo('foo was updated after click')
  appActions.updateBar('bar was updated after click')
  miscActions.updateName('name was updated after click')
}
