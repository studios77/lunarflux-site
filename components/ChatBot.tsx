'use client'
import { useEffect } from 'react'

export default function ChatBot() {
  useEffect(() => {
    const w = window as any
    if (w.ChannelIO) {
      return
    }
    const ch: any = function() {
      ch.c(arguments)
    }
    ch.q = []
    ch.c = function(args: any) {
      ch.q.push(args)
    }
    w.ChannelIO = ch
    function l() {
      if (w.ChannelIOInitialized) {
        return
      }
      w.ChannelIOInitialized = true
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'
      s.charset = 'UTF-8'
      const x = document.getElementsByTagName('script')[0]
      if (x && x.parentNode) {
        x.parentNode.insertBefore(s, x)
      } else {
        document.head.appendChild(s)
      }
    }
    if (document.readyState === 'complete') {
      l()
    } else {
      window.addEventListener('DOMContentLoaded', l, false)
      window.addEventListener('load', l, false)
    }

    w.ChannelIO('boot', {
      pluginKey: "63d8cc89-c85a-431b-af6e-4508ed8125e9"
    })
  }, [])

  return null
}
