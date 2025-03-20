import React from 'react'

function Provider({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Provider>
            {children}
        </Provider>
        </div>
  )
}

export default Provider