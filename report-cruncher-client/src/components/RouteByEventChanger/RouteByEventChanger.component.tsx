import { useNavigate } from 'react-router-dom'
import { Subject } from 'rxjs'
import { useEffect } from 'react'
import { To } from 'history'
import { NavigateOptions } from 'react-router'

export interface ChangeRouteByEvent {
  to: To
  options?: NavigateOptions
}

export const ChangeRouteByEventSubject = new Subject<ChangeRouteByEvent>()

export const RouteByEventChanger = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const subscription = ChangeRouteByEventSubject.subscribe((event) => {
      navigate(event.to, event.options)
    })

    return (): void => {
      subscription.unsubscribe()
    }
  }, [navigate])

  return <></>
}
