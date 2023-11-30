import { Bounds } from './container/bounds/Bounds';
import { getGlobalBounds } from './container/bounds/getGlobalBounds';

import type { Container } from './container/Container';

const tempBounds = new Bounds();

type RectangleLike = {x: number, y: number, width: number, height: number};

export class Cull
{
    public readonly container: Container;

    constructor(container: Container)
    {
        this.container = container;
    }

    public cull(view: RectangleLike)
    {
        this._cullRecursive(this.container, view);
    }

    private _cullRecursive(container: Container, view: RectangleLike)
    {
        if (container.view)
        {
            const bounds = getGlobalBounds(container, true, tempBounds);

            // check view intersection..
            container.visible = !(bounds.x > view.x + view.width
                || bounds.y > view.y + view.height
                || bounds.x + bounds.width < view.x
                || bounds.y + bounds.height < view.y);
        }

        for (let i = 0; i < this.container.children.length; i++)
        {
            this._cullRecursive(this.container.children[i], view);
        }
    }
}
