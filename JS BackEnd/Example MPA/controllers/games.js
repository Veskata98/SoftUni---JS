import { Router } from 'express';
import { gameById, gameStores, getAllGames, gamesByPlatform } from '../services/games.js';

const router = Router();

const STORES = {
    1: 'Steam',
    2: 'Xbox Store',
    3: 'PlayStation Store',
    4: 'App Store',
    5: 'GOG',
    6: 'Nintendo Store',
    7: 'Xbox 360 Store',
    8: 'Google Play',
    9: 'itch.io',
    11: 'Epic Games',
};

const PLATFORMS = {
    pc: 4,
    playstation5: 187,
    playstation4: 18,
    'xbox-one': 1,
    'nintendo-switch': 7,
    ios: 3,
    android: 21,
};

router.get('/', async (req, res) => {
    const search = req.query?.search?.trim();
    const page = req.query?.page || 1;

    try {
        const games = await getAllGames(search, page);

        let notFoundGames = false;

        if (games.count == 0) {
            notFoundGames = true;
        }

        let pages = Math.ceil(games.count / 15);
        let nextPage = Number(page) + 1 <= pages ? Number(page) + 1 : null;

        res.render('gamesSection', {
            title: `Games - Gamepedia`,
            games: games.results,
            notFoundGames,
            search: search || '',
            sectionHeading: 'Trending Games',
            page: page || 1,
            nextPage,
            prevPage: Number(page) - 1,
            pages,
        });
    } catch (error) {
        res.render('404', {
            title: `Page Not Found - Gamepedia`,
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        try {
            const game = await gameById(id);
            const stores = await gameStores(id);

            const availablePlatforms = [];
            const genres = [];

            stores.forEach((x) => (x.store_name = STORES[x.store_id]));

            game.platforms.forEach((x) => {
                availablePlatforms.push(x.platform.name);
            });

            game.genres.forEach((x) => {
                genres.push(x.name);
            });

            game.stores = stores;
            game.availablePlatforms = availablePlatforms.join(', ');
            game.genres = genres.join(', ');

            res.render('oneGame', { title: `${game.name} - Gamepedia`, game });
        } catch (error) {
            res.render('404', {
                title: `Page Not Found - Gamepedia`,
            });
        }
    } else {
        const platformName = id;
        const platformId = PLATFORMS[platformName];

        try {
            const search = req.query?.search?.trim();
            const page = req.query?.page || 1;

            const games = await gamesByPlatform(platformId, search, page);

            let notFoundGames = false;

            if (games.count == 0) {
                notFoundGames = true;
            }

            let pages = Math.ceil(games.count / 15);
            let nextPage = Number(page) + 1 <= pages ? Number(page) + 1 : null;

            //Uppercasing platform name
            let platformNameUpperCase = platformName.toUpperCase();

            //Adding space between platform name and collection number at end
            if (!isNaN(platformNameUpperCase[platformNameUpperCase.length - 1])) {
                platformNameUpperCase = platformNameUpperCase.slice(0, -1) + ' ' + platformNameUpperCase.slice(-1);
            }

            res.render('gamesSection', {
                title: `${platformNameUpperCase} Games - Gamepedia`,
                sectionHeading: platformNameUpperCase + ' Games',
                platformNameUpperCase,
                platformName,
                games: games.results,
                notFoundGames,
                search: search || '',
                page: page || 1,
                nextPage,
                prevPage: Number(page) - 1,
                pages,
            });
        } catch (error) {
            res.render('404', {
                title: `Page Not Found - Gamepedia`,
            });
        }
    }
});

export { router as gamesController };
