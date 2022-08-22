return (
		<Page title="APP | Login">
			<ToastAutoHide message={mensaje} />
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7}
					sx={{
						backgroundImage: 'url(./src/assets/fondo.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? "#27aae1" : "#27aae1",
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square>
					<Box
						sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
					>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<LockOutlined />
						</Avatar>
						<Typography component="h1" variant="h5">
							Entrada a los proyectos
						</Typography>
						<Box component="form" noValidate sx={{ mt: 1 }}>
							<TextField
								required
								fullWidth
								autoFocus
								value={bodyLogin.username}
								onChange={onChange}
								variant="outlined"
								margin="normal"
								label="Usuario"
								name="username"
							/>
							<TextField
								required
								fullWidth
								variant="outlined"
								value={bodyLogin.password}
								onChange={onChange}
								margin="normal"
								name="password"
								label="Contraseña"
								type={showPass ? "text" : "password"}
								autoComplete="password"
								onKeyDown={e => { if (e.keyCode === 13) { handleSubmit() } }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={() => setShowPass(!showPass)}
												onMouseDown={(event) => {
													event.preventDefault()
												}}
											>
												{showPass ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							{isLoading ? <LinearProgress color='secondary' /> : null}
							<Button
								startIcon={<LockOpen />}
								fullWidth
								variant="contained"
								color="primary"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
							>
								Entrar
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="/login" variant="body2">
										¿Olvidaste tu contraseña?
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Page>
	)
}