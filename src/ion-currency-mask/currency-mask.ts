export class CurrencyMask {
    private n: any;
    private len: any;

    public detectAmountReverse(v: any, r: boolean): string {
        if (typeof(v) === 'number') {
            return this.fixAmountReverse(v, r);
        }
        return v;
     }

    public detectAmount(v, nd): string {
        if (v) {
            this.n = v[v.length - 1];
            if (isNaN(this.n)) {
                v = v.substring(0, v.length - 1);
                return v;
            }
            v = nd ? this.fixAmountNoDecimals(v) : this.fixAmount(v);
            return v;
        }
    }

    private fixAmountReverse(a: number, r: boolean) {
        return a.toFixed(2).replace(r ? ',' : '.', r ? '.' : ',');
    }

    private fixAmount(a: string): string {
        const period = a.indexOf(',');
        if (period > -1) {
        a = a.substring(0, period) + a.substring(period + 1);
        }
        this.len = a.length;
        while (this.len < 3) {
        a = '0' + a;
        this.len = a.length;
        }
        a = a.substring(0, this.len - 2) + ',' + a.substring(this.len - 2, this.len);
        while (a.length > 4 && (a[0] === '0')) {
        a = a.substring(1)
        }
        if (a[0] === ',') {
        a = '0' + a;
        }
        a = this.removeAllDots(a);
        const spComma = a.split(',');
        if (spComma[0].length >= 4) {
        let hundreds = [];
        let b = spComma[0];
        let h = [];
        while (h = b.match(/.{1,3}$/g)) {
            if (h && h[0].length === 3) {
            hundreds.push(h[0]);
            } else {
            break;
            }
            b = b.replace(h[0], '');
        }
        hundreds = hundreds.reverse();
        hundreds.forEach((hd) => {
            b += '.' + hd;
        });
        b = b.replace(/^\./g, '');
        a = b.concat(',').concat(spComma[1]);
        }
        return (a);
    }

    private fixAmountNoDecimals(a: string): string {
        a = this.removeAllDots(a);
        if (a.length >= 4) {
        let hundreds = [];
        let b = a;
        let h = [];
        while (h = b.match(/.{1,3}$/g)) {
            if (h && h[0].length === 3) {
            hundreds.push(h[0]);
            } else {
            break;
            }
            b = b.replace(h[0], '');
        }
        hundreds = hundreds.reverse();
        hundreds.forEach((hd) => {
            b += '.' + hd;
        });
        a = b.replace(/^\./g, '');
        }
        return (a);
    }

    private removeAllDots(a: string): string {
        return a.replace(/\./g, '');
    }
}
