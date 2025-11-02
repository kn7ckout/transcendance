import RootLayout from '@components/Layout/RootLayout'
import { MetaProvider } from '@solidjs/meta'
import { Route, Router } from '@solidjs/router'
import { Toaster } from 'solid-toast'

import Cloud from '@views/Cloud'
import Discord from '@views/Discord'
import Home from '@views/Home'
import NotFound from '@views/NotFound'
import Plugins from '@views/Plugins'
import Projects from '@views/Projects'
import Team from '@views/Team'
import Icons from '@views/Icons'

export default function Routes() {
    return (
        <MetaProvider>
            <Toaster position="top-right" gutter={8} />
            <Router root={RootLayout}>
                <Route path="/" component={Home} />
                <Route path="/projects" component={Projects} />
                <Route path="/features" component={Plugins} />
                <Route path="/cloud" component={Cloud} />
                <Route path="/icons" component={Icons} />
                <Route path="/team" component={Team} />
                <Route path="/discord" component={Discord} />
                <Route path="*" component={NotFound} />
            </Router>
        </MetaProvider>
    )
}
