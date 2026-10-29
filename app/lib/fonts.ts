import localFont from 'next/font/local'

export const salvager = localFont({
  src: [
    {
      path: '../../public/fonts/SALVAGER.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-salvager',
})

export const cormorant = localFont({
  src: [
    {
      path: '../../public/fonts/CormorantGaramond-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-CormorantGaramond',
})

export const worksans = localFont({
  src: [
    {
      path: '../../public/fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-WorkSans',
})