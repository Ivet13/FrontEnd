<template>
    <div class="wrapper">
        <nav id="nav">
            <RouterLink id="logo" to="/">
                Picture Gallery App LOGO
            </RouterLink>
            <RouterLink :to="{ name: 'pictures' }">My account
            </RouterLink>
        </nav>
    </div>
</template>