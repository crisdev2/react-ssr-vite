import React from 'react'
import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import { Link } from './Link'
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from "styled-components";

export { PageShell }

const createCustomTheme = ({ darkMode }: any) =>
  createTheme({
    typography: {
      //useNextVariants: true,
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#b348fe" : "#77a6ff",
      },
      secondary: {
        main: darkMode ? "#333" : "#ffcf29",
      },
    },
    props: {
      MuiButton: {
        variant: "contained",
        color: "primary"
      },
    },
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: "red",
        },
      },
    },
  }
);

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(() => createCustomTheme({ darkMode }), [darkMode]);

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
      <StylesProvider injectFirst>
        <MuiThemeProvider {...{ theme }}>
          <ThemeProvider {...{ theme }}>
            <CssBaseline />
              <Layout>
                <Sidebar>
                  <Logo />
                  <Link className="navitem" href="/">
                    Home
                  </Link>
                  <Link className="navitem" href="/about">
                    About
                  </Link>
                </Sidebar>
                <Content>{children}</Content>
              </Layout>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.8em'
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: '2px solid #eee',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
