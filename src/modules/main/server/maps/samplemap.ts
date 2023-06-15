import { RpgMap, MapData } from '@rpgjs/server'
import { VillagerEvent } from '../events/villager'
import { CommitEvent } from '../events/commitEvent'
import { RevealEvent } from '../events/revealEvent'

@MapData({
    id: 'simplemap',
    file: require('./tmx/simplemap.tmx'),
    name: 'Forest',
    events: [
        VillagerEvent,
        CommitEvent,
        RevealEvent
    ]
})
export class SampleMap extends RpgMap {}