<template functional>
<span><el-icon @click.native="() => props.onClose()" class="el-icon-close"></el-icon>{{props.label}}:</span>
</template>
