import PageBootstrap from '@components/PageBootstrap'
import { CloudFog } from 'lucide-solid'

export default function Cloud() {
    return (
        <PageBootstrap
            meta={{ title: 'Cloud' }}
            icon={<CloudFog />}
            fullWidth
            title="Cloud"
            description="Cloud sync feature coming soon"
        >
            <div class="mt-6 flex flex-col gap-6">
                <div class="text-center">
                    <h1 class="text-2xl font-bold text-white mb-4">
                        if u see this ur cute, dm dot.mil on discord /_ \
                    </h1>
                </div>
            </div>
        </PageBootstrap>
    )
}
