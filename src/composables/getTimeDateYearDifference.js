const getTimeDateYearDifference = (created_at) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const date1 = new Date(created_at)
        const date2 = new Date()
        
        // get day difference
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

        const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

        if ( days == 0 ) {
            let diff = (date2.getTime() - date1.getTime()) / 1000;
            diff /= (60 * 60);
            const hr = Math.abs(Math.round(diff));
            
            return hr + " hrs ago by"
        } else if ( days <= 31 ) {
            return days + " days ago by";
        }

        //get the month and year created
        const month = date1.toLocaleString('default', { month: 'long' });
        const day = date1.getDate();
        const year = date1.getFullYear();

        if ( date1.getFullYear() == date2.getFullYear() ) {
            return month + " "+ day + " by";
        } else {
            return month + " "+ day + ", " + year + " by";
        }
}

export default getTimeDateYearDifference