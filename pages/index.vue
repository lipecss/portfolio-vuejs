<template>
  <div class="arcade">
    <HudNav />
    <main>
      <HeroTitle />

      <section class="arc-wrap arcade-stage">
        <BugInvaders class="arcade-stage__game" />
        <AchievementList />
      </section>

      <MarqueeTicker />
      <CharacterCard />
      <InventoryGrid />
      <MissionsSection />
      <LogSection />
      <PausedSection />
      <CoopContact />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.arcade-stage {
  padding-bottom: 96px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: stretch;
}

.arcade-stage__game {
  flex: 999 1 600px;
}
</style>
