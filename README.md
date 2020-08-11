# dofus-touch-resource-fetcher
This is the resources fetcher project that fetches all resources from the (official website)[https://www.dofus-touch.com/en/mmorpg/encyclopedia/] of dofus touch.
When you instal and start the application that you will see the following files under the data folder for example:
```
├── data
│   ├── ceremonial-item.json
│   ├── consumables.json
│   ├── equipment.json
│   ├── monsters.json
│   ├── pets.json
│   ├── resources.json
│   └── weapons.json
```
The item interface is:
```
interface Item {
  name: string;
  partition: string;
  itemId: number;
  imageId: number;
  itemUrl: string;
  imageUrl: string;
}
```


## Requirements
- node 12
- yarn

# Install
- `git clone https://github.com/umutc/dofus-touch-resource-fetcher.git`
- `cd dofus-touch-resource-fetcher`
- `yarn install`

# Start
- `yarn start`

# Develop
- `yarn watch`
