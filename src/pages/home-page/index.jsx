import { useEffect, useState } from "react";
import { Box, Grid, Typography, Stack, Chip, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { Container } from "@mui/system";
import { Add, PlayArrow, ArrowForward, Check, Close, ExpandMore, Bolt, Shield, Search, Favorite, History, VideoLibrary, SmartDisplay, Tune, MenuBook } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoToTopButton from "../../components/shared/go-to-top-button";
import CustomButton from "../../components/shared/custom-button";
import PlaylistForm from "../../components/playlist-form";
import { useStoreState } from "easy-peasy";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useStoreState((s) => s.playlists);
  const count = Object.keys(data).length;
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <Box sx={{ bgcolor: "#09090B", color: "#fff", overflow: "hidden" }}>
      {/* HERO — editorial, less AI */}
      <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 4, md: 6 }, borderBottom: "1px solid #18181B" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#22C55E" }} />
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", color: "#A1A1AA" }}>FOR LEARNERS • NO ADS • NO DISTRACTIONS</Typography>
              </Stack>

              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: { xs: "2.2rem", sm: "2.7rem", md: "3.2rem" }, mb: 1.8 }}>
                Watch YouTube
                <br />
                playlists
                <br />
                <Box component="span" sx={{ color: "#E4E4E7", fontWeight: 400, fontStyle: "italic", fontFamily: "Georgia,serif" }}>— without</Box> the mess.
              </Typography>

              <Typography sx={{ color: "#A1A1AA", fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.7, maxWidth: 520, mb: 3 }}>
                Clean YouTube saves any YouTube <Box component="span" sx={{ color: "#fff", fontWeight: 700 }}>playlist or single video</Box> and plays it in a quiet, ad-free player. No shorts, no recommendations, no rabbit holes. Just your content, start to finish.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 3 }}>
                <CustomButton icon={Add} text="Add playlist or video" onClick={() => setOpen(true)} sx={{ px: 3, py: 1.3, fontSize: "0.95rem", borderRadius: "10px" }} />
                <Box
                  component={RouterLink}
                  to="/playlists"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    px: 3,
                    py: 1.3,
                    borderRadius: "10px",
                    border: "1px solid #27272A",
                    bgcolor: "#18181B",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    "&:hover": { bgcolor: "#27272A" },
                  }}
                >
                  View library <ArrowForward sx={{ fontSize: 16 }} />
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "#27272A" }} />} sx={{ py: 1.5, borderTop: "1px solid #18181B", borderBottom: "1px solid #18181B" }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1 }}>100%</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: "0.75rem" }}>Ad-free</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1 }}>{count}+</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: "0.75rem" }}>Playlists saved</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1 }}>0</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: "0.75rem" }}>Login needed</Typography>
                </Box>
              </Stack>
              <Typography sx={{ color: "#52525B", fontSize: "0.72rem", mt: 1.2 }}>Paste any playlist or video link (watch, youtu.be, shorts) • Stored locally</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Browser mock — human, minimal */}
              <Box sx={{ maxWidth: 560, mx: "auto", borderRadius: "14px", overflow: "hidden", border: "1px solid #27272A", bgcolor: "#111113", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                <Box sx={{ height: 40, borderBottom: "1px solid #27272A", display: "flex", alignItems: "center", gap: 1.2, px: 1.5, bgcolor: "#18181B" }}>
                  <Stack direction="row" spacing={0.7}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27272A", border: "1px solid #3F3F46" }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27272A", border: "1px solid #3F3F46" }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27272A", border: "1px solid #3F3F46" }} />
                  </Stack>
                  <Box sx={{ flex: 1, ml: 1, height: 26, borderRadius: "6px", bgcolor: "#09090B", border: "1px solid #27272A", display: "flex", alignItems: "center", px: 1, gap: 0.8 }}>
                    <Search sx={{ fontSize: 12, color: "#52525B" }} />
                    <Typography sx={{ fontSize: "0.72rem", color: "#71717A" }}>youtube.com/playlist?list=PL…</Typography>
                    <Box sx={{ ml: "auto", width: 6, height: 6, borderRadius: "50%", bgcolor: "#22C55E" }} />
                  </Box>
                </Box>

                <Box sx={{ p: 1.5, bgcolor: "#09090B" }}>
                  <Box sx={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #27272A", bgcolor: "#000", aspectRatio: "16/9", position: "relative" }}>
                    <Box component="img" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop" alt="course" sx={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />
                    <Box sx={{ position: "absolute", bottom: 10, left: 10, right: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Chip label="Lesson 4 • 12:42" size="small" sx={{ bgcolor: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "0.68rem", height: 22, border: "1px solid rgba(255,255,255,0.14)" }} />
                      <Box sx={{ px: 1, py: 0.3, borderRadius: "6px", bgcolor: "#fff", color: "#09090B", fontSize: "0.65rem", fontWeight: 800 }}>AD-FREE</Box>
                    </Box>
                    <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: "50%", bgcolor: "#fff", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                        <PlayArrow sx={{ color: "#09090B", fontSize: 24, ml: "2px" }} />
                      </Box>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mt: 1.2, overflowX: "auto" }}>
                    {["Intro", "Setup", "Core Concepts", "Project"].map((t, i) => (
                      <Box key={t} sx={{ minWidth: 120, p: 1, borderRadius: "8px", border: "1px solid", borderColor: i === 1 ? "#3F3F46" : "#27272A", bgcolor: i === 1 ? "#18181B" : "#111113", flexShrink: 0 }}>
                        <Box sx={{ height: 58, borderRadius: "6px", bgcolor: "#27272A", mb: 0.8 }} />
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap" }}>{`${i + 1}. ${t}`}</Typography>
                        <Typography sx={{ fontSize: "0.68rem", color: "#71717A" }}>{8 + i * 3}:42</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ px: 1.5, py: 1.2, borderTop: "1px solid #27272A", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#111113" }}>
                  <Typography sx={{ fontSize: "0.78rem", color: "#A1A1AA" }}>
                    <Box component="span" sx={{ color: "#fff", fontWeight: 700 }}>18 videos</Box> • No shorts • No comments
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "#71717A" }}>clean-tube.app</Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: "center" }}>
                <Chip label="Playlists" size="small" sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 600 }} />
                <Chip label="Single videos" size="small" sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 600 }} />
                <Chip label="No ads" size="small" sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontWeight: 600 }} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
        <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", color: "#71717A", mb: 1 }}>HOW IT WORKS</Typography>
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.9rem" }, letterSpacing: "-0.02em", mb: 1 }}>Three steps to focus.</Typography>
        <Typography sx={{ color: "#A1A1AA", maxWidth: 520, mb: 4, fontSize: "0.937rem", lineHeight: 1.6 }}>No account, no extension. Just paste and learn. Your library stays in your browser.</Typography>

        <Grid container spacing={2}>
          {[
            { n: "01", title: "Paste playlist link", desc: "Copy any YouTube playlist URL or ID. Search can find one for you.", icon: Search },
            { n: "02", title: "Save to library", desc: "We fetch titles & thumbnails via YouTube API and store locally.", icon: VideoLibrary },
            { n: "03", title: "Watch distraction-free", desc: "Clean player, search inside playlist, favorites & recents.", icon: SmartDisplay },
          ].map((s) => (
            <Grid item xs={12} md={4} key={s.n}>
              <Box sx={{ p: 2.5, borderRadius: "14px", border: "1px solid #27272A", bgcolor: "#111113", height: "100%", position: "relative", overflow: "hidden" }}>
                <Typography sx={{ fontSize: "2.4rem", fontWeight: 800, color: "#18181B", lineHeight: 1, position: "absolute", top: 12, right: 16 }}>{s.n}</Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mb: 2 }}>
                  <s.icon sx={{ fontSize: 18, color: "#A1A1AA" }} />
                </Box>
                <Typography sx={{ fontWeight: 700, mb: 0.6 }}>{s.title}</Typography>
                <Typography sx={{ color: "#71717A", fontSize: "0.875rem", lineHeight: 1.6 }}>{s.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURES */}
      <Box sx={{ bgcolor: "#111113", borderTop: "1px solid #18181B", borderBottom: "1px solid #18181B" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2} sx={{ mb: 4 }}>
            <Box>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.9rem" }, letterSpacing: "-0.02em" }}>Everything YouTube isn’t.</Typography>
              <Typography sx={{ color: "#71717A", mt: 0.6 }}>Built for students and developers who actually finish courses.</Typography>
            </Box>
            <Box
              onClick={() => navigate("/playlists")}
              sx={{ display: "inline-flex", alignSelf: { xs: "flex-start", md: "center" }, alignItems: "center", gap: 0.8, color: "#A1A1AA", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", "&:hover": { color: "#fff" } }}
            >
              Open your library <ArrowForward sx={{ fontSize: 16 }} />
            </Box>
          </Stack>

          <Grid container spacing={1.5}>
            {[
              { icon: Shield, title: "Ad-free playback", desc: "No pre-roll, mid-roll or banner. The video starts and stays clean." },
              { icon: Tune, title: "No recommendations", desc: "No shorts, no autoplay traps, no sidebar rabbit holes." },
              { icon: Search, title: "Search inside playlist", desc: "Find ‘hooks’ or ‘lesson 12’ instantly among 100+ videos." },
              { icon: Favorite, title: "Favorites", desc: "Star any playlist. One click to your shortlist." },
              { icon: History, title: "Recents", desc: "Automatically remembers what you watched last." },
              { icon: MenuBook, title: "Study mode", desc: "Minimal player, large titles, progress dots, up-next queue." },
            ].map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Box sx={{ p: 2.2, borderRadius: "12px", bgcolor: "#09090B", border: "1px solid #27272A", height: "100%" }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "#18181B", border: "1px solid #27272A", display: "grid", placeItems: "center", mb: 1.5 }}>
                    <f.icon sx={{ fontSize: 16, color: "#A1A1AA" }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.937rem", mb: 0.5 }}>{f.title}</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: "0.84rem", lineHeight: 1.6 }}>{f.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* COMPARISON */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
        <Box sx={{ borderRadius: "16px", border: "1px solid #27272A", overflow: "hidden" }}>
          <Box sx={{ p: { xs: 2.5, md: 3 }, bgcolor: "#111113", borderBottom: "1px solid #27272A", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2, alignItems: "center" }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>YouTube vs Clean YouTube</Typography>
            <Chip label="Side-by-side" size="small" sx={{ bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA" }} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, bgcolor: "#09090B" }}>
            <Box sx={{ p: 2.5, borderBottom: { xs: "1px solid #27272A", md: "none" }, borderRight: { md: "1px solid #27272A" } }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", color: "#52525B", mb: 1.5 }}>FEATURE</Typography>
              <Stack spacing={1.2} sx={{ color: "#A1A1AA", fontSize: "0.875rem" }}>
                <Box>Ads during video</Box>
                <Box>Shorts & recommendations</Box>
                <Box>Search in playlist</Box>
                <Box>Save & organize</Box>
                <Box>Distraction level</Box>
              </Stack>
            </Box>
            <Box sx={{ p: 2.5, borderBottom: { xs: "1px solid #27272A", md: "none" }, borderRight: { md: "1px solid #27272A" }, bgcolor: "#18181B" }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", color: "#52525B", mb: 1.5 }}>YOUTUBE</Typography>
              <Stack spacing={1.2} sx={{ fontSize: "0.875rem" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#F87171" }}><Close sx={{ fontSize: 14 }} /> Yes — often</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#F87171" }}><Close sx={{ fontSize: 14 }} /> Everywhere</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#71717A" }}><Close sx={{ fontSize: 14 }} /> No</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#71717A" }}><Close sx={{ fontSize: 14 }} /> Limited</Stack>
                <Box sx={{ color: "#F87171", fontWeight: 700 }}>High</Box>
              </Stack>
            </Box>
            <Box sx={{ p: 2.5, bgcolor: "#09090B" }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", color: "#22C55E", mb: 1.5 }}>CLEAN YOUTUBE</Typography>
              <Stack spacing={1.2} sx={{ fontSize: "0.875rem" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#22C55E" }}><Check sx={{ fontSize: 14 }} /> Never</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#22C55E" }}><Check sx={{ fontSize: 14 }} /> Removed</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#22C55E" }}><Check sx={{ fontSize: 14 }} /> Instant</Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#22C55E" }}><Check sx={{ fontSize: 14 }} /> Unlimited</Stack>
                <Box sx={{ color: "#22C55E", fontWeight: 700 }}>Zero</Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* USE CASES */}
      <Box sx={{ bgcolor: "#111113", borderTop: "1px solid #18181B" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.35rem", md: "1.6rem" }, letterSpacing: "-0.02em", textAlign: "center" }}>Who is it for?</Typography>
          <Typography sx={{ color: "#71717A", textAlign: "center", mb: 4, mt: 0.8 }}>Three real workflows we see every day.</Typography>
          <Grid container spacing={2}>
            {[
              { tag: "STUDENT", title: "Finish the course, finally.", desc: "Save a 80-video DSA playlist, search ‘graph’ when stuck, resume from recents. No YouTube homepage to distract you the night before exam." },
              { tag: "DEVELOPER", title: "Learn without context switching.", desc: "Keep React, System Design, Golang playlists separate. Favorite the active one. Clean player = docs + video side by side." },
              { tag: "TEACHER", title: "Curate for your batch.", desc: "Collect best playlists by topic, share the playlist ID with students, let them use Clean YouTube for focused viewing." },
            ].map((c) => (
              <Grid item xs={12} md={4} key={c.tag}>
                <Box sx={{ p: 2.5, borderRadius: "12px", border: "1px solid #27272A", bgcolor: "#09090B", height: "100%" }}>
                  <Chip label={c.tag} size="small" sx={{ mb: 1.5, bgcolor: "#18181B", border: "1px solid #27272A", color: "#A1A1AA", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em" }} />
                  <Typography sx={{ fontWeight: 700, mb: 0.8 }}>{c.title}</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: "0.875rem", lineHeight: 1.6 }}>{c.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.35rem", md: "1.6rem" }, letterSpacing: "-0.02em", textAlign: "center" }}>Questions, answered.</Typography>
        <Typography sx={{ color: "#71717A", textAlign: "center", mb: 3, mt: 0.8 }}>Everything you asked before adding the first playlist.</Typography>
        <Box sx={{ border: "1px solid #27272A", borderRadius: "12px", overflow: "hidden", bgcolor: "#111113" }}>
          {[
            { q: "Do I need to log in?", a: "No. Everything is stored in your browser (localStorage). No account, no tracking. Clear site data = library cleared." },
            { q: "Will it skip YouTube ads?", a: "The embedded player here plays the playlist without the usual YouTube UI and ads around it. You get the video, nothing else." },
            { q: "Can I add private playlists?", a: "Public and unlisted playlists work. Private playlists need you to be logged in on YouTube, so they can’t be fetched via API." },
            { q: "Is there a limit?", a: "No hard limit. Add as many as you want. Use search and favorites to manage a large library. Data stays local, so device storage is the only limit." },
            { q: "How is this different from YouTube Premium?", a: "Premium removes ads but keeps recommendations and shorts. Clean YouTube removes distractions entirely and is free, focused purely on playlists." },
          ].map((f, i) => (
            <Accordion key={f.q} disableGutters elevation={0} sx={{ bgcolor: "#111113", borderBottom: i === 4 ? "none" : "1px solid #27272A", "&:before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: "#71717A" }} />} sx={{ px: 2.5, py: 0.5 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.937rem" }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2 }}>
                <Typography sx={{ color: "#71717A", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* FINAL CTA — minimal */}
      <Box sx={{ mx: { xs: 2, md: 3 }, mb: 4 }}>
        <Box sx={{ borderRadius: "16px", border: "1px solid #27272A", bgcolor: "#111113", p: { xs: 3, md: 4 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: "space-between", gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.25rem", md: "1.45rem" }, letterSpacing: "-0.02em" }}>Ready to focus?</Typography>
            <Typography sx={{ color: "#71717A", fontSize: "0.937rem", mt: 0.5 }}>Add a playlist in 5 seconds. Your library lives at /playlists.</Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ flexShrink: 0 }}>
            <CustomButton icon={Add} text="Add Playlist" onClick={() => setOpen(true)} sx={{ borderRadius: "10px", px: 3 }} />
            <Box
              component={RouterLink}
              to="/playlists"
              sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.8, px: 3, py: 1.2, borderRadius: "10px", border: "1px solid #27272A", bgcolor: "#09090B", color: "#fff", fontWeight: 600, textDecoration: "none" }}
            >
              Go to library <ArrowForward sx={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Box>
      </Box>

      <PlaylistForm open={open} handleClose={() => setOpen(false)} />
      <GoToTopButton />
    </Box>
  );
};

export default HomePage;
