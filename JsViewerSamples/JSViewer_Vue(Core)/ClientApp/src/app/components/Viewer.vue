<template>
    <div id="viewerContainer">
    </div>
</template>
<script>
    export default {
        props: ['reportName'],
        mounted() {
            this.viewer = new GrapeCity.ActiveReports.JSViewer.create({
                element: '#viewerContainer'
            });
        },
        watch: {
            reportName() {
                this.viewer.openReport(this.reportName);
            }
        },
    }
</script>
<style>
    #viewerContainer {
        background-color: #e5e5e5;
        height: 100vh;
        float: right;
        width: calc(100% - 200pt);
    }
</style>