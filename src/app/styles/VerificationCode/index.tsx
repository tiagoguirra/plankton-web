import React, { useEffect, useRef, useState } from 'react'
import { CodeForm, CodeInput } from './style'

interface VerificationCodeProps {
  value: string
  onChange: (code: string) => void
}

export const VerificationCode: React.FC<VerificationCodeProps> = ({
  onChange,
  value
}) => {
  useEffect(() => {
    const [a = '', b = '', c = '', d = '', e = '', f = ''] = value.split('')
    setCode({ a, b, c, d, e, f })
    if (!value && refs.a.current) {
      refs.a.current.focus()
    }
  }, [value])

  const [code, setCode] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: ''
  })

  const refs: { [key: string]: React.MutableRefObject<any> } = {
    a: useRef(null),
    b: useRef(null),
    c: useRef(null),
    d: useRef(null),
    e: useRef(null),
    f: useRef(null)
  }

  useEffect(() => {
    const { a, b, c, d, e, f } = code
    onChange(`${a}${b}${c}${d}${e}${f}`)
  }, [code])

  const focusNext = (name: string) => {
    const indexCurrent = Object.keys(refs).indexOf(name)
    const indexNext = indexCurrent + 1
    const key = Object.keys(refs)[indexNext]

    const ref = refs[key]

    if (ref.current) {
      ref.current.focus()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    const _value = value.replace(/\D/g, '')

    const lastDigit = _value[_value.length - 1]

    setCode({ ...code, [name]: lastDigit || '' })
    if (lastDigit && name !== 'f') {
      focusNext(name)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const paste = event.clipboardData.getData('text')

    const value = paste.replace(/\D/g, '')
    const [a = '', b = '', c = '', d = '', e = '', f = ''] = value.split('')

    setCode({ a, b, c, d, e, f })
  }

  return (
    <CodeForm>
      <CodeInput
        type="text"
        name="a"
        size="small"
        onChange={handleChange}
        autoFocus
        value={code.a || ''}
        inputRef={refs.a}
        autoComplete="off"
        onPaste={handlePaste}
      />
      <CodeInput
        type="text"
        name="b"
        size="small"
        onChange={handleChange}
        value={code.b || ''}
        inputRef={refs.b}
        autoComplete="off"
      />
      <CodeInput
        type="text"
        name="c"
        size="small"
        onChange={handleChange}
        value={code.c || ''}
        inputRef={refs.c}
        autoComplete="off"
      />
      <CodeInput
        type="text"
        name="d"
        size="small"
        onChange={handleChange}
        value={code.d || ''}
        inputRef={refs.d}
        autoComplete="off"
      />
      <CodeInput
        type="text"
        name="e"
        size="small"
        onChange={handleChange}
        value={code.e || ''}
        inputRef={refs.e}
        autoComplete="off"
      />
      <CodeInput
        type="text"
        name="f"
        size="small"
        onChange={handleChange}
        value={code.f || ''}
        inputRef={refs.f}
        autoComplete="off"
      />
    </CodeForm>
  )
}
