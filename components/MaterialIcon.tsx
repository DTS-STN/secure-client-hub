import { MaterialSymbol } from 'react-material-symbols'

// because typescript
// the real icon list is several thousand long and we'd need to typecheck it with
// SymbolCodepointsArray.find((e) => e === icon)
const MaterialIcon: Record<string, JSX.Element> = {
  'demography': (
    <MaterialSymbol icon="demography" weight={400} grade={0} size={24} />
  ),
  'lock': <MaterialSymbol icon="lock" weight={400} grade={0} size={24} />,
  'mail': <MaterialSymbol icon="mail" weight={400} grade={0} size={24} />,
  'notification-active': (
    <MaterialSymbol
      icon="notifications_active"
      weight={400}
      grade={0}
      size={44}
    />
  ),
  'notifications-active': (
    <MaterialSymbol
      icon="notifications_active"
      weight={400}
      grade={0}
      size={24}
    />
  ),
}

export function getIcon(icon?: string) {
  if (!icon || !(icon in MaterialIcon)) {
    return <></>
  }
  return MaterialIcon[icon]
}
