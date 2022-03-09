import React from 'react'
import { render } from '@testing-library/react'

import QrScanner from './QrScanner'

describe('QrScanner', () => {
  test('renders the QrScanner component', () => {
    render(<QrScanner />)
  })
})
